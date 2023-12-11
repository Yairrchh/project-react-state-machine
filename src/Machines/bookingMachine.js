import { assign, createMachine,fromPromise  } from "xstate";
import { fetchCountries } from "../Utils/api";

const fillCountries = {
    initial: 'loading',
    states: {
        loading: {
            invoke: {
                id: 'getCountries',
                src:  fromPromise(() => fetchCountries()),
                onDone: {
                    target: 'success',
                    actions: assign({
                        countries: ({event}) => event.output,
                    })
                },
                onError: {
                    target: 'failure',
                    actions: assign({
                        error: 'fail request',
                    })
                }
            }
        },
        success: {},
        failure: {
            on: {
                RETRY: {target: 'loading'},
            },
        },
    },
};

const bookingMachine = createMachine({
    id: "buy plane tickets",
    initial: "initial",
    context:{
        passengers: [],
        selectedCountry: '',
        countries: [],
        error: '',
    },
    states: {
        initial: {
        on: {
            START: "search",
        },
        },
        search: {
        on: {
            CONTINUE: {
                target: 'passengers',
                actions: assign({
                    selectedCountry: ({ event }) => event.selectedCountry,
                }),
            },
            CANCEL: "initial",
        },
        ...fillCountries,
        },
        tickets: {
                after: {
                    5000: {
                        target: 'initial',
                        actions: 'cleanContext'
                    }
                },
                on: {
                    FINISH: {
                        target: 'initial',
                        actions: 'cleanContext',
                    },
                    },
                },
        passengers: {
                    on: {
                            DONE: {
                                target: 'tickets',
                                guard: 'moreThanOnePassenger',
                            },
                            CANCEL: {
                                target: 'initial',
                                actions: 'cleanContext',
                            },
                            ADD: {
                                target: 'passengers',
                                actions: assign(
                                ({context, event}) => context.passengers.push(event.newPassengers)
                            )
                        },
                    },
                },
            },
        },
        {
            actions: {
                cleanContext: assign({
                selectedCountry: "",
                passengers: [],
                }),
            },
            guards: {
                moreThanOnePassenger: ({context}) => {
                return context.passengers.length > 0;
                }
        }
    }
);

export { bookingMachine};
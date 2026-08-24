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
    id: "todoticketFlights",
    initial: "initial",
    context:{
        passengers: [],
        selectedCountry: '',
        selectedPrice: 0,
        selectedDate: '',
        selectedTime: '',
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
                    selectedPrice: ({ event }) => event.selectedPrice,
                    selectedDate: ({ event }) => event.selectedDate,
                    selectedTime: ({ event }) => event.selectedTime,
                }),
            },
            CANCEL: "initial",
        },
        ...fillCountries,
        },
        tickets: {
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
                                guard: 'passengersValid',
                                actions: assign({
                                    passengers: ({ event }) => event.passengers,
                                }),
                            },
                            CANCEL: {
                                target: 'initial',
                                actions: 'cleanContext',
                            },
                    },
                },
            },
        },
        {
            actions: {
                cleanContext: assign({
                selectedCountry: "",
                selectedPrice: 0,
                selectedDate: "",
                selectedTime: "",
                passengers: [],
                }),
            },
            guards: {
                passengersValid: ({ event }) => {
                    return event.passengers.length > 0
                        && event.passengers.every((name) => name.trim().length > 0);
                }
        }
    }
);

export { bookingMachine};
/*
import { writable, derived } from "svelte/store";

export const name = writable("world")

export const greeting = derived (name, ($name) => `Hello ${$name}`) */

import { writable} from "svelte/store";

export function localStorageStore(key, initial) {
    if(!localStorage.getItem(key)){
        localStorage.setItem(key, JSON.stringify(initial))
    }

    const saved = JSON.parse(localStorage.getItem(key) );
    const {subscribe, set, update} = writable(saved)

    return {
        subscribe,
        set: (value) => {
            localStorage.setItem(key, JSON.stringify(value))
            return set(value)
        },
        update
    }
}
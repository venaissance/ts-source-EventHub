class EventHub {
    // {'Event1': [fn1, fn2....]}
    private cache: { [key: string]: Array<(data: unknown) => void> } = {}

    on(EventName: string, fn: (data: unknown) => void) {
        this.cache[EventName] = this.cache[EventName] || []
        this.cache[EventName].push(fn)
    }

    emit(EventName: string, data?: unknown) {
        (this.cache[EventName] || []).forEach((fn: (data: unknown) => void) => {
            fn(data)
        });
    }

    off(EventName: string, fn: () => void) {
        const index = indexOf(this.cache[EventName], fn)
        if (index === -1) return
        this.cache[EventName].splice(index, 1)
    }
}

/**
 * 帮助函数
 * @param arr 
 * @param item 
 */
function indexOf(arr: Array<unknown>, item: unknown) {
    if (arr === undefined) return -1
    let index = -1
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] === item) {
            index = i
            break
        }
    }
    return index
}

export default EventHub

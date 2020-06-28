import EventHub from '../src/index'

type TestCase = (message: string) => void

// 1. EventHub 会创建一个对象
const test1: TestCase = (message) => {
    const eh = new EventHub()
    console.assert(eh instanceof Object === true, 'EventHub 是一个对象')
    console.log(message)
}

// 2. .on注册后，.emit会触发注册方法
const test2: TestCase = (message) => {
    const eh = new EventHub()
    let called = false
    eh.on('Eat', data => {
        called = true
        console.assert(data[0] === '吃')
        console.assert(data[1] === '饭')
    })
    eh.emit('Eat', ['吃', '饭'])
    console.assert(called)
    console.log(message)
}

// 3. .on注册后，.off取消，再.emit不会触发注册方法
const test3: TestCase = (message) => {
    const eh = new EventHub()
    let called = false
    const fn = () => {
        called = true
    }
    eh.on('Eat', fn)
    eh.off('Eat', fn)
    eh.emit('Eat')
    console.assert(called === false)
    console.log(message)
}

test1('EventHub 会创建一个对象')
test2('.on注册后，.emit会触发注册方法')
test3('.on注册后，.off取消，再.emit不会触发注册方法')

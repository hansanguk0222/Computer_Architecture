class Memory {
    constructor() {
        this.mem = {}
        this.length = 0
    }

    load_instruction(arr) {
        arr.map(x => {
            this.mem[this.length] = x
            this.length++
        })
        return this
    }
}

module.exports = Memory
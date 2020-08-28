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

    set_Memory(arr) {
        arr.map(x => {
            if(x[0] !== 'R') {
                this.mem[x] = Math.floor(Math.random() * 10) + 1
            }
        })
    }
}

module.exports = Memory
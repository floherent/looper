class Duration {
    // duration in milliseconds.
    private _duration: number

    static readonly millisecondsPerSecond = 1000
    static readonly secondsPerMinute = 60
    static readonly minutesPerHour = 60
    static readonly hoursPerDay = 24

    // 1 minute = 60 * 1000 ms
    static readonly millisecondsPerMinute = Duration.millisecondsPerSecond * Duration.secondsPerMinute

    // 1 hour   = 60 * (60 * 1000) ms
    static readonly millisecondsPerHour = Duration.minutesPerHour * Duration.millisecondsPerMinute

    // 1 day    = 24 * (60 * 60 * 1000) ms
    static readonly millisecondsPerDay = Duration.hoursPerDay * Duration.millisecondsPerHour

    get inMilliseconds(): number {
        return this._duration
    }

    constructor(
        values: {
            days?: number
            hours?: number
            minutes?: number
            seconds?: number
            milliseconds?: number
        } = {},
    ) {
        // accept positive numbers only.
        for (let value of Object.values(values)) {
            if (value > 0) continue
            value = 0
        }

        // merge a clean state of duration.
        const duration = { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, ...values }
        const { days, hours, minutes, seconds, milliseconds } = duration

        // the total milliseconds.
        this._duration =
            milliseconds +
            Duration.millisecondsPerSecond * seconds +
            Duration.millisecondsPerMinute * minutes +
            Duration.millisecondsPerHour * hours +
            Duration.millisecondsPerDay * days
    }

    toString(): string {
        return `Duration in milliseconds: ${this.inMilliseconds}`
    }
}

class Looper {
    constructor(readonly duration = new Duration({ seconds: 2 })) {}

    loop(action: () => void, repeat = 5): void {
        if (!action || typeof action !== 'function') return

        let counter = 0

        const intervalRef = setInterval(() => {
            action()
            counter++
            if (counter >= repeat) clearInterval(intervalRef)
        }, this.duration.inMilliseconds)
    }
}

export { Duration, Looper }

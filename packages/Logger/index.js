class Logger {
    log(message) {
        console.log("[LOG] " + [new Date().toISOString(), message].join(' - '));
    }

    error(message) {
        console.error("[ERROR] " + [new Date().toISOString(), message].join(' - '));
    }

    warn(message) {
        console.warn("[WARNING] " + [new Date().toISOString(), message].join(' - '));
    }

    success(message) {
        console.log("[SUCCESS] " + [new Date().toISOString(), message].join(' - '));
    }
}

export default new Logger();
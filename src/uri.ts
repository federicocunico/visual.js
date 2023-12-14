class UriBuilder {
    serverIp: string;
    serverPort: string | number;
    api: string;
    protocol: string;
    params: string[] = [];

    constructor(serverIp: string, serverPort: string | number, api: string, protocol: string = "http") {
        this.serverIp = serverIp;
        this.api = api;
        this.protocol = protocol;
        this.serverPort = serverPort;
    }

    addParam(key: string, value: string): void {
        this.params.push(`${key}=${value}`);
    }

    build(): string {
        return `${this.protocol}://${this.serverIp}:${this.serverPort}/${this.api}?${this.params.join("&")}`;
    }
}

export { UriBuilder }

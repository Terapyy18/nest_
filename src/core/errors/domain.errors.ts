export class DomainError extends Error {

    public code: string;
    public statusCode: number;
    public fields?: Record<string, string[]>;
    public details?: Record<string, unknown>;

    constructor(params: {
        code: string;
        message: string;
        statusCode: number;
        fields?: Record<string, string[]>;
        details?: Record<string, unknown>;

    }) {
    super(params.message)

    this.code = params.code;
    this.statusCode = params.statusCode;
    this.fields = params.fields;
    this.details = params.details;

    Object.setPrototypeOf(this, new.target.prototype);
}
}
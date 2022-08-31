abstract class AggregateField {
  alias_?: string;

  static count(): Count {
    return new Count();
  }

  alias(alias: string): AggregateField {
    this.alias_ = alias;
    return this;
  }

  abstract toProto(): any
}

class Count extends AggregateField {
  upTo_?: number

  upTo(upTo: number): AggregateField {
    this.upTo_ = upTo;
    return this;
  }

  toProto(): any {
    const convertedUpTo = this.upTo_ ? {upTo: {value: this.upTo_}} : null;
    const count = Object.assign({}, convertedUpTo);
    return Object.assign({count}, this.alias_ ? {alias: this.alias_} : null);
  }
}

export {AggregateField}

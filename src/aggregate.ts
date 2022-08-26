
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
  maximum_?: number

  maximum(maximum: number): AggregateField {
    this.maximum_ = maximum;
    return this;
  }

  toProto(): any {
    const convertedMaximum = this.maximum_ ? {up_to: this.maximum_} : null;
    const count = Object.assign({}, convertedMaximum);
    return Object.assign({count}, this.alias_ ? {alias: this.alias_} : null);
  }
}

export {AggregateField}

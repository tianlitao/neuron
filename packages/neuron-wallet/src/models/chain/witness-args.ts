export default class WitnessArgs {
  public static EMPTY_LOCK = '0x' + '0'.repeat(130)

  public lock?: string
  public inputType?: string
  public outputType?: string

  constructor(lock?: string, inputType?: string, outputType?: string) {
    this.lock = lock
    this.inputType = inputType
    this.outputType = outputType
  }

  public static fromObject({ lock, inputType, outputType }: {
    lock?: string,
    inputType?: string,
    outputType?: string
  }): WitnessArgs {
    return new WitnessArgs(lock, inputType, outputType)
  }

  public setEmptyLock() {
    this.lock = WitnessArgs.EMPTY_LOCK
  }

  public static generateEmpty(): WitnessArgs {
    return new WitnessArgs()
  }

  public static emptyLock(): WitnessArgs {
    return new WitnessArgs(
      WitnessArgs.EMPTY_LOCK,
      undefined,
      undefined,
    )
  }

  public toSDK(): CKBComponents.WitnessArgs {
    return {
      lock: this.lock,
      inputType: this.inputType,
      outputType: this.outputType,
    }
  }
}



import type { FieldContext } from '@vinejs/compiler/types'

import vine, { VineString } from '@vinejs/vine'

export type RuleOptions = {
  assumeValid: boolean
}

const assume = async (
  _value: unknown,
  options: RuleOptions,
  field: FieldContext
): Promise<void> => {
  if (!field.isValid) {
    return
  }

  if (!options.assumeValid) {
    field.report('The {{ field }} field is invalid', 'assume', field)
  }
}

export const assumeRule = vine.createRule(assume, {
  isAsync: true,
})

declare module '@vinejs/vine' {
  export interface VineString {
    assume(validate: RuleOptions): this
  }
}

VineString.macro('assume', function (this: VineString, options: RuleOptions) {
  return this.use(assumeRule(options))
})

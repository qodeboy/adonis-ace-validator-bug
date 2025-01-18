import vine from '@vinejs/vine'

export const pingValidator = vine.compile(
  vine
    .string()
    .regex(/^[a-zA-Z0-9]+$/)
    .assume({
      assumeValid: true,
    })
)

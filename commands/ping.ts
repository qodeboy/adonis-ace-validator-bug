import { pingValidator } from '#validators/ping'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class Ping extends BaseCommand {
  static commandName = 'ping'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    const pingValue = await this.prompt.ask('Ping', {
      validate: async (value: string | undefined): Promise<boolean | string> => {
        const [error] = await pingValidator.tryValidate(value)

        if (!error) {
          return true
        }

        return 'Ping value is not valid'
      },
    })

    this.logger.info(`Ping value: ${pingValue}`)
  }
}

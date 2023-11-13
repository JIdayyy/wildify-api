import zod from "zod";

const environmentSchema = zod.object({
  DATABASE_URL: zod.string(),
  PORT: zod.number(),
  SECRET: zod.string(),
});

export class EnvironmentService {
  private readonly config: Record<any, any>;

  constructor(config: Record<any, any>) {
    this.config = config;
    try {
      environmentSchema.parse(config);
    } catch (error) {
      console.log("FAILED TO PARSE ENVIRONMENT VARIABLES");
      console.log(error);
      process.exit(1);
    }
  }

  get(key: string) {
    function getValueFromConfig(config: Record<string, any>, key: string) {
      const keys = key.split(".");
      let value = config;

      for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];
        value = value[currentKey];

        if (value === undefined) {
          break;
        }
      }
      return value;
    }
    return getValueFromConfig(this.config, key);
  }
}

export const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: parseInt(process.env.PORT || "4000", 10),
  SECRET: process.env.SECRET,
};

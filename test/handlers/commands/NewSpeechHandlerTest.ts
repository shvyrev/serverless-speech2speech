import "mocha"
import * as chai from "chai";

import {main} from "../../../src/handlers/commands/NewSpeechHandler";

chai.should();

describe("AwsTranslate", function() {
    this.timeout(20000);

    it("should create a new speech", async () => {
        process.env.region = "eu-west-1";
        process.env.voiceBucket = "test-speech-bucket";
        process.env.tableName = "test-speech-table"

        const event = {
            sourceSpeech: {
                language: "en-US",
                voice: {
                    voiceStream: Buffer.from("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RhOjpIruZlbyM7szt26/b287/p3kV6Oqdf67sfXa//SrI692///6/pYlRKcXMMd0EpFHiSEeWsk01QwAH31kTfmt1K6UxwDqMthdd/AE9nb0sgzwKm+Ytik///NixJwey7KhvsvKsD/iVrOEkQvEkL4mnC8FJUxEHx5NUVjHWPS48QweuYYxRe7Hshpsxp3+yO/ef802m3q79EYyabLGIcrnObbX/mV06q+59ZnMZXf//nr6/+quzmmzjap8iPNEctwKDDkKbkScmlsklssksjjbLYWQFpmL0WpGQPJfkaf7RhFipMhDTOZQDdDmBzSLESI0QUNiYP/zYsSwH5uqoZ9ZUACYI0g7DMjcLZcUTaiYMDwzQz5PFgpnSIGZfL5XLQs0bhdIERcqj6H0XDVTIMZmaZNF0qEyo2SNEEDc2KJOKLJgZltJO5eKLl04iUDciyJcNzY8cmhzZ0l0Dy0dZqXSqTxsViZNS6bLPmbnjM2TPqSP1u6SloH0nMjBBF01tPm5qsuOXDcxJkvmyZkVFqTUtVP/82DEwTmsCr5fj5ADmJiZIMm6CnVWnZm/8pkXNzxQZSR5epmMmQQMDRkafVUyCDVHnLUylBOySJuKQGFMtcSgFkRRJfKSx1DAhMuqpTlEE1UGNkgUcoYl0Q62UcjEIaizLox8yfiLnHR7EEykCIecQvV0NUBBGPOL5KZa2F766LGQn+Yccb+zLPdPy+ZKtUvWefy0MBMKxcFT8dj/82LEaR6i5rL9yRgA4KiRYhV7bFBVkQu9QdrDRVqVYqh2kIAZDw5jTiXDLJdCj5t2I4qbCaWLnFByLB7LmEErK7fDt97h6KjDb6dYrZr2ri6YaZd7TPQzNobl5kAJSkEo9pv/Z87LeJDlzh38309Q62YxjO0ZY5NUcEjghXqTcOGqkDArOhRKgFcVLQKp5XI531AZ+eUbnBYgGbFc//NixH4dozaaMEFHrOtE4kRi5OSmQUk/7axJ3BUf2r1lEtYlv/NR7zjzVAw6ATRs6uaw2DAQrhrC/5uXoBMYKQVlBCUVjFb/VpnKjoZUBCl9qGcv/+hhRjGfurSshilEgqWAolpJHoNPEXJEGJ5WWJhoO5Z5YCuZSkxBTUUzLjk5LjWqB/tQkCSuahRoeKstNYqxYrwELiuKi18XZv/zYMSXHKrecXQwxWSxbi/XoCooS/9ISFcVFBbFvzIsLJUgez+oX//FhX+KokxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/zYsSoDjAB9ZQIRACqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=", "base64")
                }
            },
            translatedSpeech: {
                language: "fr-FR",
                voice: {
                    vocalist: "Celine"
                }
            }
        };

        const callback = (error, data) => {
            console.log(error);
            console.log(data);
        };

        await main(event, {}, callback);
    });
});
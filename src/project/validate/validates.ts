import { z } from "zod";

export const validateID = (id: string) => {
    try {
      z.number().parse(+id);
    } catch (error) {
      return {
        messages: error.issues[0].message,
        error: 'Bad Request',
        statusCode: 400,
      };
    }
}
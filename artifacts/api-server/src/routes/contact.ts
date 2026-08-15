import { Router, type IRouter } from "express";
import { SubmitContactFormBody, SubmitContactFormResponse } from "@workspace/api-zod";
import { sendContactFormEmail } from "../lib/mailer";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactFormBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: parsed.error.issues[0]?.message ?? "Некорректные данные формы",
    });
    return;
  }

  try {
    await sendContactFormEmail(parsed.data);

    const response = SubmitContactFormResponse.parse({
      success: true,
      message: "Заявка успешно отправлена",
    });

    res.json(response);
  } catch (error) {
    logger.error({ err: error }, "Failed to send contact form email");

    res.status(500).json({
      message: "Не удалось отправить заявку. Попробуйте позже или свяжитесь с нами по телефону.",
    });
  }
});

export default router;

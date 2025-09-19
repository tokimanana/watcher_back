import { time } from "console";
import { Request, Response, NextFunction } from "express";

export function responseFormatterMiddleware(req: Request, res: Response, next: NextFunction) {
  const originalSend = res.send.bind(res);

  res.send = function (body: any): Response {
    res.send = originalSend;

    try {
      
      JSON.stringify(body);
    } catch (err) {
      return originalSend.call(this, {
        message: "Erreur de sérialisation du corps de la réponse",
        success: false,
        data: null,
        timestamp: new Date().toISOString(),
      });
    }


    const alreadyFormatted =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      "success" in body &&
      "data" in body;

    if (alreadyFormatted) {
      return originalSend.call(this, body);
    }

    const isSuccess = res.statusCode >= 200 && res.statusCode < 300;
    
    const finalResponse = {
      message: res.locals['message'] || (isSuccess ? "Requête traitée avec succès" : "Une erreur s'est produite"),
      success: isSuccess,
      data: body ?? null,
      timestamp: new Date().toISOString(),
    };

    return originalSend.call(this, finalResponse);
  };

  next();
}
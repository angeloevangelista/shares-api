import getHtml from 'html-get';
import { parse } from 'node-html-parser';
import { Request, Response } from 'express';

import stringToNumber from '../utils/stringToNumber';
import AppError from '../errors/AppError';

const documentQuery = 'div.BNeawe.iBp4i.AP7Wnd div div.BNeawe.iBp4i.AP7Wnd';

class SharesController {
  public async show(request: Request, response: Response): Promise<Response> {
    console.log;
    const { sharesName } = request.query;

    if (!sharesName) throw new AppError('sharesName is required');

    const { html } = await getHtml(
      `https://www.google.com/search?&q=${sharesName}`,
    );

    if (!html) throw new AppError('No information was found');

    const parsedHtml = parse(html);

    const lang = parsedHtml.querySelector('html')?.getAttribute('lang');

    if (!lang) {
      throw new AppError(
        'An error occurred while identifying the language',
        406,
      );
    }

    const spanTagWithData = parsedHtml.querySelector(documentQuery);

    if (!spanTagWithData) throw new AppError('No information was found');

    let [
      priceString,
      scaleString,
      percentageScaleString,
    ] = spanTagWithData.innerText.split(' ');

    const price = stringToNumber(priceString, lang);

    const scale = {
      isPositive: scaleString.charAt(0) === '+',
      value: stringToNumber(scaleString.substring(1), lang),
      percentage: stringToNumber(
        percentageScaleString.substring(1, percentageScaleString.length - 2),
        lang,
      ),
    };

    return response.json({
      success: true,
      content: {
        price,
        scale,
      },
      lang,
    });
  }
}

export default SharesController;

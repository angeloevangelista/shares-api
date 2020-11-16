import getHtml from 'html-get';
import { parse } from 'node-html-parser';
import { Request, Response } from 'express';

import stringToNumber from '../utils/stringToNumber';

const documentQuery = 'div.BNeawe.iBp4i.AP7Wnd div div.BNeawe.iBp4i.AP7Wnd';

class SharesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { sharesName } = request.query;

    if (!sharesName) {
      return response.status(400).json({
        success: false,
        error: 'sharesName is required.',
        content: null,
      });
    }

    const { html } = await getHtml(
      `https://www.google.com/search?&q=${sharesName}`,
    );

    if (!html) {
      return response.status(400).json({
        success: false,
        error: 'No information was found.',
        content: null,
      });
    }

    const parsedHtml = parse(html);

    const lang = parsedHtml.querySelector('html')?.getAttribute('lang');

    if (!lang) {
      return response.status(406).json({
        success: false,
        error: 'An error occurred while identifying the language.',
        content: null,
      });
    }

    const spanTagWithData = parsedHtml.querySelector(documentQuery);

    if (!spanTagWithData) {
      return response.status(400).json({
        success: false,
        error: 'No information was found.',
        content: null,
      });
    }

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
      error: null,
      content: {
        price,
        scale,
      },
      lang,
    });
  }
}

export default SharesController;

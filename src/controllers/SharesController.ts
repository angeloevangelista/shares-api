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

    const spanTagWithData = parse(html).querySelector(documentQuery);

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

    const price = stringToNumber(priceString);

    const scale = {
      isPositive: scaleString.charAt(0) === '+',
      value: stringToNumber(scaleString.substring(1)),
      percentage: stringToNumber(
        percentageScaleString.substring(1, percentageScaleString.length - 2),
      ),
    };

    return response.json({
      success: true,
      error: null,
      content: {
        price,
        scale,
      },
    });
  }
}

export default SharesController;

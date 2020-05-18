import Page from '../models/Page';

class PageController {
  async indexOne(request, response) {
    const { publicationId, page } = request.body;

    const found = await Page.findOne({
      where: { publicationId, number: page },
    });

    if (!found)
      return response
        .status(400)
        .json({ error: true, errorMessage: 'The page is not found.' });

    return response.status(200).json(found);
  }
}

export default new PageController();

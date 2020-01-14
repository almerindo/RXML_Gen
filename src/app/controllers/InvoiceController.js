import * as Yup from 'yup';
import builder from 'xmlbuilder';
import Invoice from '../models/Invoice';

class InvoiceController {
  async index(req, res) {
    // const rps = await Invoice.create(req.body);
    const CompNfse = builder.create('CompNfse');
    const Nfse = CompNfse.ele('Nfse');
    const InfNfse = Nfse.ele('InfNfse');
    InfNfse.att('Id', 'NFSe201500000000003');

    const xml = CompNfse.end({ pretty: true });
    // const rps = await Invoice.create(req.body);
    // const xml = await Invoice.toXML(rps.id);
    console.log('Q@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(xml);
    console.log('Q@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

    return res.json(xml);
  }

  async post(req, res) {
    const schema = Yup.object().shape({
      Numero: Yup.string().required(),
      CodigoVerificacao: Yup.string().required(),
      DataEmissao: Yup.string().required(),
      NaturezaOperacao: Yup.string().required(),
      OptanteSimplesNacional: Yup.string().required(),
      IncentivadorCultural: Yup.string().required(),
      Competencia: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const rpsExists = await Invoice.findOne({
      where: { numero: req.body.numero },
    });
    if (rpsExists) {
      return res
        .status(400)
        .json({ error: `RPS number ${req.body.Numero} already exists` });
    }
    const xml = builder.create('CompNfse', { type: 'git' }, 'aa').end();
    // const rps = await Invoice.create(req.body);
    // const xml = await Invoice.toXML(rps.id);
    console.log('Q@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(xml);
    return res.json(xml);
  }
}
export default new InvoiceController();

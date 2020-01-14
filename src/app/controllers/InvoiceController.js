import * as Yup from 'yup';
import builder from 'xmlbuilder';
import Invoice from '../models/Invoice';

const { SignedXml } = require('xml-crypto');
const { FileKeyInfo } = require('xml-crypto');
const fs = require('fs');

class InvoiceController {
  async post(req, res) {
    // Criar XML a partir do req.body (POST)
    function buildXML() {
      // Inicio do version 1.0 e enconding utf-8
      const CompNfse = builder.create('CompNfse', {
        version: '1.0',
        encoding: 'utf-8',
      });
      CompNfse.att('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema');
      CompNfse.att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
      CompNfse.att('xmlns', 'http:/www.abrasf.org.br/nfse.xsd');

      // Inicio da Nota
      const Nfse = CompNfse.ele('Nfse').att('versao', '1.00');
      const InfNfse = Nfse.ele('InfNfse').att('Id', req.body.numero);
      InfNfse.ele('Numero', req.body.numero);
      InfNfse.ele('CodigoVerificacao', req.body.codigo_verificacao);
      InfNfse.ele('DataEmissao', req.body.data_emissao);
      InfNfse.ele('NaturezaOperacao', req.body.natureza_operacao);
      InfNfse.ele('OptanteSimplesNacional', req.body.optante_simples_nacional);
      InfNfse.ele('IncentivadorCultural', req.body.incentivador_cultural);
      InfNfse.ele('Competencia', req.body.competencia);
      // Servico/Valores
      const Servico = InfNfse.ele('Servico');
      const Valores = Servico.ele('Valores');
      Valores.ele('ValorServicos', req.body.valor_servicos);
      Valores.ele('IssRetido', req.body.iss_retido);
      Valores.ele('ValorIss', req.body.valor_iss);
      Valores.ele('BaseCalculo', req.body.base_calculo);
      Valores.ele('Aliquota', req.body.aliquota);
      Servico.ele('ItemListaServico', req.body.item_lista_servico);
      Servico.ele(
        'CodigoTributacaoMunicipio',
        req.body.codigo_tributacao_municipio
      );
      Servico.ele('Discriminacao', req.body.discriminacao);
      Servico.ele('CodigoMunicipio', req.body.codigo_municipio);

      // PrestadorServico
      const Prestador = InfNfse.ele('PrestadorServico');
      Prestador.ele('IdentificacaoPrestador')
        .ele('Cnpj', req.body.prest_cnpj)
        .up()
        .ele('InscricaoMunicipal', req.body.prest_inscricao_municipal)
        .up();
      Prestador.ele('RazaoSocial', req.body.prest_razao_social);
      Prestador.ele('NomeFantasia', req.body.prest_nome_fantasia);
      Prestador.ele('Endereco')
        .ele('Endereco', req.body.prest_endereco)
        .up()
        .ele('Numero', req.body.prest_numero)
        .up()
        .ele('Complemento', req.body.prest_complemento)
        .up()
        .ele('Bairro', req.body.prest_bairro)
        .up()
        .ele('CodigoMunicipio', req.body.prest_codigo_municipio)
        .up()
        .ele('Uf', req.body.prest_uf)
        .up()
        .ele('Cep', req.body.prest_cep)
        .up();

      Prestador.ele('Contato')
        .ele('Telefone', req.body.prest_telefone)
        .up()
        .ele('Email', req.body.prest_email)
        .up();

      // TOMADOR
      const Tomador = InfNfse.ele('TomadorServico');
      Tomador.ele('IdentificacaoTomador')
        .ele('CpfCnpj')
        .ele('Cnpj', req.body.tom_cnpj)
        .up();
      Tomador.ele('RazaoSocial', req.body.tom_razao_social);

      Tomador.ele('Endereco')
        .ele('Endereco', req.body.tom_endereco)
        .up()
        .ele('Numero', req.body.tom_numero)
        .up()
        .ele('Complemento', req.body.tom_complemento)
        .up()
        .ele('Bairro', req.body.tom_bairro)
        .up()
        .ele('CodigoMunicipio', req.body.tom_codigo_municipio)
        .up()
        .ele('Uf', req.body.tom_uf)
        .up()
        .ele('Cep', req.body.tom_cep)
        .up();

      Tomador.ele('Contato')
        .ele('Telefone', req.body.tom_telefone)
        .up()
        .ele('Email', req.body.tom_email)
        .up();

      // Orgao Gerador
      InfNfse.ele('OrgaoGerador')
        .ele('CodigoMunicipio', req.body.og_codigo_municipio)
        .up()
        .ele('Uf', req.body.og_uf)
        .up();
      // Configuração para gerar string XML, em produçao colocar pretty:false
      const xml = CompNfse.end({
        pretty: true,
        indent: '  ',
        newline: '\n',
        width: 0,
        allowEmpty: false,
        spacebeforeslash: '',
      });

      return xml;
    }
    const xml = await buildXML();
    // assinar o XML
    async function assingXML() {
      const option = {
        // <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
        // <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
        // <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
        // <Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
        // <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
        canonicalizationAlgorithm:
          'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
        implicitTransforms: [
          'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
          'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
        ],
      };

      const sig = await new SignedXml(null, option);
      sig.addReference("//*[local-name(.)='InfNfse']");
      sig.signingKey = fs.readFileSync(`${process.env.PATH_CERT}/server.pem`);

      function MyKeyInfo() {
        this.getKeyInfo = function(key, prefix) {
          prefix = prefix || '';
          prefix = prefix ? `${prefix}:` : prefix;
          return `<${prefix}X509Data>${key}</${prefix}X509Data>`;
        };

        this.getKey = function(keyInfo) {
          // you can use the keyInfo parameter to extract the key in any way you want
          // TODO Retornar a chave publica do certificado
          return fs.readFileSync(`${process.env.PATH_CERT}/server.pem`);
        };
      }

      sig.keyInfoProvider = new MyKeyInfo();
      sig.computeSignature(xml);

      return sig.getSignedXml();
    }

    const xmlSigned = await assingXML(xml);
    console.log('Q@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

    console.log(xmlSigned);
    console.log('Q@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

    return res.json({
      signedInvoiceID: req.body.numero,
      signedInvoice: xmlSigned,
    });
  }

  async index(req, res) {
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

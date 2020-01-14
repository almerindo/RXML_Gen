import Sequelize, { Model } from 'sequelize';
import builder from 'xmlbuilder';

class Invoice extends Model {
  static init(sequelize) {
    super.init(
      {
        // InfNfse
        numero: Sequelize.STRING,
        codigo_verificacao: Sequelize.STRING,
        data_emissao: Sequelize.STRING,
        natureza_operacao: Sequelize.STRING,
        optante_simples_nacional: Sequelize.STRING,
        incentivador_cultural: Sequelize.STRING,
        competencia: Sequelize.STRING,

        // Servicos/Valores
        valor_servicos: Sequelize.STRING,
        iss_retido: Sequelize.STRING,
        valor_iss: Sequelize.STRING,
        base_calculo: Sequelize.STRING,
        aliquota: Sequelize.STRING,

        // Servicos/ItemListaServico
        item_lista_servico: Sequelize.STRING,

        // ServicosCodigoTributacaoMunicipio
        codigo_tributacao_municipio: Sequelize.STRING,

        // Servicos/Discriminacao
        discriminacao: Sequelize.STRING,

        // Servicos/CodigoMunicipio
        codigo_municipio: Sequelize.STRING,

        /**
         * PrestadorServico
         */

        // PrestadorServico/IdentificacaoPrestador
        prest_cnpj: Sequelize.STRING,
        prest_inscricao_municipal: Sequelize.STRING,

        // PrestadorServico/RazaoSocial
        prest_razao_social: Sequelize.STRING,
        // PrestadorServico/NomeFantasia
        prest_nome_fantasia: Sequelize.STRING,

        // PrestadorServico/Endereco
        prest_endereco: Sequelize.STRING,
        prest_numero: Sequelize.STRING,
        prest_complemento: Sequelize.STRING,
        prest_bairro: Sequelize.STRING,
        prest_codigoMunicipio: Sequelize.STRING,
        prest_uf: Sequelize.STRING,
        prest_cep: Sequelize.STRING,

        // PrestadorServico/Contato
        prest_telefone: Sequelize.STRING,
        prest_email: Sequelize.STRING,

        /**
         * TomadorServico
         */
        // TomadorServico/IdentificacaoTomador
        tom_cnpj: Sequelize.STRING,
        // TomadorServico/RazaoSocial
        tom_razao_social: Sequelize.STRING,
        // TomadorServico/Endereco
        tom_endereco: Sequelize.STRING,
        tom_numero: Sequelize.STRING,
        tom_complemento: Sequelize.STRING,
        tom_bairro: Sequelize.STRING,
        tom_codigo_municipio: Sequelize.STRING,
        tom_uf: Sequelize.STRING,
        tom_cep: Sequelize.STRING,
        // TomadorServico/Contato
        tom_telefone: Sequelize.STRING,
        tom_email: Sequelize.STRING,

        /**
         * OrgaoGerador
         */
        og_codigo_municipio: Sequelize.STRING,
        og_uf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static async toXML(key) {
    const obj = await this.findByPk(key);
    // pegar cada campo do obj e colocar em seu devido lugar no XML
    // Retornar o XML
    const json = obj.toJSON();

    const xml = await builder.create('CompNfse', { type: 'git' }, 'aa').end();
    // .create('root')
    // .ele('xmlbuilder')
    // .ele(
    //   'repo',
    //   { type: 'git' },
    //   'git://github.com/oozcitak/xmlbuilder-js.git'
    // )
    // .end({ pretty: true });

    return xml;
  }
}

export default Invoice;

/**
 * Example of XML RPS
 *
 *
 * <CompNfse xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http:/www.abrasf.org.br/nfse.xsd">
<Nfse versao="1.00">
<InfNfse Id="NFSe201500000000003">
<Numero>201500000000003</Numero>
<CodigoVerificacao>EC5Y-QRX8</CodigoVerificacao>
<DataEmissao>2015-04-24T16:11:42</DataEmissao>
<NaturezaOperacao>1</NaturezaOperacao>
<OptanteSimplesNacional>2</OptanteSimplesNacional>
<IncentivadorCultural>2</IncentivadorCultural>
<Competencia>2015-04-01T00:00:00</Competencia>
<Servico>...</Servico>
<PrestadorServico>...</PrestadorServico>
<TomadorServico>
<IdentificacaoTomador>
<CpfCnpj>
<Cnpj>05951647000112</Cnpj>
</CpfCnpj>
</IdentificacaoTomador>
<RazaoSocial>NETSERVICES SERVICOS DE INTERNET LTDA</RazaoSocial>
<Endereco>
<Endereco>Rua Monsenhor Silveira</Endereco>
<Numero>276</Numero>
<Complemento>SALA 10</Complemento>
<Bairro>São José</Bairro>
<CodigoMunicipio>2800308</CodigoMunicipio>
<Uf>SE</Uf>
<Cep>49015030</Cep>
</Endereco>
<Contato>
<Telefone>7921068000</Telefone>
<Email>Administracao@infonet.com.br</Email>
</Contato>
</TomadorServico>
<OrgaoGerador>...</OrgaoGerador>
</InfNfse>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">...</Signature>
</Nfse>
</CompNfse>
 *
 *
 *
 */

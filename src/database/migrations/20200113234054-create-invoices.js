module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoices', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // InfNfse

      numero: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      codigo_verificacao: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      data_emissao: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      natureza_operacao: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      optante_simples_nacional: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      incentivador_cultural: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      competencia: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      // Servicos/Valores
      valor_servicos: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      iss_retido: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      valor_iss: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      base_calculo: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      aliquota: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      // Servicos/ItemListaServico
      item_lista_servico: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      // ServicosCodigoTributacaoMunicipio
      codigo_tributacao_municipio: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      // Servicos/Discriminacao
      discriminacao: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      // Servicos/CodigoMunicipio
      codigo_municipio: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      /**
       * PrestadorServico
       */

      // PrestadorServico/IdentificacaoPrestador
      prest_cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      prest_inscricao_municipal: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      // PrestadorServico/RazaoSocial
      prest_razao_social: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      // PrestadorServico/NomeFantasia
      prest_nome_fantasia: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      // PrestadorServico/Endereco
      prest_endereco: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      prest_numero: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      prest_complemento: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      prest_bairro: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      prest_codigo_municipio: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      prest_uf: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      prest_cep: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      // PrestadorServico/Contato
      prest_telefone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

      prest_email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },

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

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('invoices');
  },
};

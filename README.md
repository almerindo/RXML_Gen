# RXML_sign
Este módulo backend funcionará assim:
Somente com o usuário MASTER serão cadastrados novos usuários para as empresas.

A empresa se loga e troca a senha ou atualiza seus dados.
Quando a empresa se loga, é criada uma sessão e fornecido um Token JWT.

A partir daí todas as operações devem fornecer o Token.

A empresa, pode fazer upload de seu certificado digital.

Após Upload do certificado o processo de configuração está finalizado. E esse
 certificado será utilizado para assinar todas as NFSe da empresa e enviar para a SEFAZ municipal.

 Para isso, será feito um upload de um XML NFSe, que será assinado com o
  certificado da empresa e enviado para a SEFAZ. Esse metódo irá retornar o protocolo de autorização ou o erro.

  Todas as notas autorizadas são cadastradas em uma fila Queue para serem enviadas por email. O gerenciador de fila irá informar se conseguiu transmitir ou não. E permitirá reenviar ou cancelar cada um dos Jobs de envios de emails.



É um módulo API REST que deverá ter as seguintes características:


00) Criar middleware de autenticação para garantir que somente usuário logado possa assinar.

0) Cadastrar um certificado. A rota /cert permite enviar arquivo de certificado digital. Somente quem pode cadastrar o certificado é um usuário autenticado. Exigirá que um token válido seja passado como parâmetro.


Este certificado deverá ser utilizado para assinar todos os documentos XML


1) Modulo de assinatura de XML no padrão IBAN. Este módulo possui  a funcionalidade de receber um arquivo xml (RPS) e email que receberá esta NOTA. Ao receber esses dados e armazená-los em banco de dados este módulo irá e assinar o XML com o certificado cadastrado. Após assinar o arquivo, deverá armazená-lo em uma Queue (gerenciador de filas background) para ser enviado à prefeitura e por e-mail. O arquivo assinado deverá estar em diretório /XML/unsent/ e cadastrado no banco de dados Redis ( que será utilizado pelo gerenciador de filas).

2) Módulo de processamento e envio das Notas Fiscais de Serviço. Este módulo, irá verificar se existe XML's a serem enviados à prefeitura. Caso exista, deverá pegar o arquivo, consumir o webservice da prefeitura e enviá-los, retornando o número de protocolo de autorização ou erro. As notas que foram enviadas com sucesso deverão ser guardada em banco de dados REDIS para serem gerenciadas pela fila de envio de emails.

3) Módulo




1) Possui a função de receber um XML no padrão do WEBISS, guardar em filesystem /XML/uploaded e guardar no banco de dados REDIS chave e valor do arquivo recebido (arquivo ainda não assinado);



2) Módulo de execução em paralelo que verifica o banco de dados Redis se existe XML recebidos para serem assinados. Caso exista, esse módulo assina todos os XMLs e armazena em outro banco de dados REDIS e em diretório /XML/unsent

3) Módulo de execução em paralelo que verifica o banco de dados REDIS se existe XML assinados e ainda não enviados. Caso exista, esse módulo envia os XMLs para a prefeitura WEBISS via Webservice.


assiná-lo com o certificado X.509 da empresa e guardar os xmls assinados e ainda não transmitidos em filesystem /XML/unsent e em um banco de dados Redis (com a referencia do XML e PATH)


deverá possuir a rota: /files
Esta Rota recebe o arquivo XML e armazena em filesystem /XML/uploaded e no Redis que guarda a chave e valor dos arquivos enviados.




nela irá um arquivo RPS

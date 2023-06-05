sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {
                //vamos criar um modelo
                //antes, as variáveis vão no torneio
                // var dadosGerais = {
                //     rodada : '9ª',
                //     campeonato: "Brasileirão 2023 do Canal FioriNET"
                // };

                // agora vamos criar o modelo
                // var dadosModel = new JSONModel();
                // dadosModel.setData(dadosGerais);
                // var view = this.getView();
                // view.setModel(dadosModel, "ModeloDadosGerais");

                // 3 objetos vazios
                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};

                //3 modelos - 1 para cada objeto
                var dadosModel = new JSONModel(dadosGerais);
                var classificacaoModel = new JSONModel(classificacao);
                var partidasModel = new JSONModel(partidas);

                // atribuimos 3 modelos à tela - view
                this.getView().setModel(dadosModel, "ModeloDadosGerais");
                this.getView().setModel(classificacaoModel, "ModeloClassificacao");
                this.getView().setModel(partidasModel, "ModeloPartidas");

                this.buscarDadosGerais();
                this.buscarClassificacao();
            },
            buscarDadosGerais: function() {
                //obter o model a ser atualizado
                var dadosModel2 = this.getView().getModel("ModeloDadosGerais");

                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method: "GET",
                    async: true,
                    crossDomain:true,
                    headers: {
                        authorization: "Bearer test_e46aa53d456dce19fe0ef8e2cb278d"
                    }
                };

                //fazemos a chamada à API
                $.ajax(configuracoes)

                //sucesso
                .done(function(resposta){
                    dadosModel2.setData(resposta);
                    this.buscarPartidas(resposta.rodada_atual.rodada);
                }.bind(this))

                //erro
                .fail(function(erro){
                    
                })
            },
            buscarClassificacao: function() {
                //obter o model a ser atualizado
                var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");

                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method: "GET",
                    async: true,
                    crossDomain:true,
                    headers: {
                        authorization: "Bearer test_e46aa53d456dce19fe0ef8e2cb278d"
                    }
                };

                //fazemos a chamada à API
                $.ajax(configuracoes)

                //sucesso
                .done(function(resposta){
                    
                    classificacaoModel2.setData({"Classificacao": resposta});
                })

                //erro
                .fail(function(erro){
                    
                })
            },
            buscarPartidas: function(rodada) {
                //obter o model a ser atualizado
                var partidasModel2 = this.getView().getModel("ModeloPartidas");
                
                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    method: "GET",
                    async: true,
                    crossDomain:true,
                    headers: {
                        authorization: "Bearer test_e46aa53d456dce19fe0ef8e2cb278d"
                    }
                };

                //fazemos a chamada à API
                $.ajax(configuracoes)

                //sucesso
                .done(function(resposta){
                    partidasModel2.setData({"Partidas": resposta});
                })

                //erro
                .fail(function(erro){
                    
                })
            }
        });
    });

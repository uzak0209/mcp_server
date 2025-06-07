"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const inMemory_js_1 = require("@modelcontextprotocol/sdk/inMemory.js");
const index_js_2 = require("./index.js");
(0, vitest_1.describe)("getDiceRoll", () => {
    (0, vitest_1.it)("ランダムにサイコロを振った結果を返す", () => __awaiter(void 0, void 0, void 0, function* () {
        // テスト用クライアントの作成
        const client = new index_js_1.Client({
            name: "test client",
            version: "0.1.0",
        });
        // インメモリ通信チャネルの作成
        const [clientTransport, serverTransport] = inMemory_js_1.InMemoryTransport.createLinkedPair();
        // クライアントとサーバーを接続
        yield Promise.all([
            client.connect(clientTransport),
            index_js_2.server.connect(serverTransport),
        ]);
        // 6面サイコロを振る
        const result = yield client.callTool({
            name: "getDiceRoll",
            arguments: {
                sides: 6,
            },
        });
        // 結果が1-6の範囲の数字であることを確認
        (0, vitest_1.expect)(result).toEqual({
            content: [
                {
                    type: "text",
                    text: vitest_1.expect.stringMatching(/^[1-6]$/),
                },
            ],
        });
    }));
});

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { describe, it, expect } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { server } from "./index.js";
describe("getDiceRoll", () => {
    it("ランダムにサイコロを振った結果を返す", () => __awaiter(void 0, void 0, void 0, function* () {
        // テスト用クライアントの作成
        const client = new Client({
            name: "test client",
            version: "0.1.0",
        });
        // インメモリ通信チャネルの作成
        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
        // クライアントとサーバーを接続
        yield Promise.all([
            client.connect(clientTransport),
            server.connect(serverTransport),
        ]);
        // 6面サイコロを振る
        const result = yield client.callTool({
            name: "getDiceRoll",
            arguments: {
                sides: 6,
            },
        });
        // 結果が1-6の範囲の数字であることを確認
        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: expect.stringMatching(/^[1-6]$/),
                },
            ],
        });
    }));
});

import { PageTitle } from "./components/PageTitle";

export default function Home() {
  return (
    <main className="container mx-auto p-2">
      <section className="p-5 bg-gray-50">
        <PageTitle />
        <div className="flex justify-end">
          <button className="flex items-center gap-1 bg bg-[#0094B5] hover:bg-[#0094b581] text-white py-1 px-3 rounded-md">
            <span>+</span> Criar Objetivo
          </button>
        </div>

        <div className="mt-5 flex justify-between flex-wrap">
          <div className="w-full md:w-[49%]">
            <div className="bg-white p-5 rounded-md shadow-sm ">
              <h2 className="font-bold mb-2">
                Melhorar a satisfação do Cliente
              </h2>
              <div className="mb-4">
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "37%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    37%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <hr className="text-black w-[40%]" />
                <h3 className="text-gray-400 text-sm">Resultados-Chave</h3>
                <hr className="text-black w-[40%]" />
              </div>

              <div className="mb-4">
                <h2 className="font-bold mb-2">Aumentar o NPS de 60 para 80</h2>
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "35%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    35%
                  </span>
                </div>
                <ul className="mt-2 flex flex-col gap-2">
                  <li className="text-sm text-gray-400 flex justify-between">
                    Implementar pesquisas de satisfação pós-atendimento{" "}
                    <span>25%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Criar um programa de fidelidade para clientes recorrentes{" "}
                    <span>10%</span>
                  </li>
                </ul>
              </div>

              <hr className="py-2" />

              <div className="mb-4">
                <h2 className="font-bold mb-2">Aumentar o NPS de 60 para 80</h2>
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "38%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    35%
                  </span>
                </div>
                <ul className="mt-2 flex flex-col gap-2">
                  <li className="text-sm text-gray-400 flex justify-between">
                    Implementar um chatbot para suporte básico <span>99%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Criar uma central de ajuda com FAQs detalhadas{" "}
                    <span>10%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Ampliar a equipe de atendimento em horário de pico{" "}
                    <span>5%</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-[#0094B5] hover:underline mt-1">
                + Adicionar Resultado-Chave
              </button>
            </div>
          </div>

          <div className="w-full md:w-[49%]">
            <div className="bg-white p-5 rounded-md shadow-sm ">
              <h2 className="font-bold mb-2">
                Aumentar a conversão no e-commerce
              </h2>
              <div className="mb-4">
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "59%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    37%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <hr className="text-black w-[40%]" />
                <h3 className="text-gray-400 text-sm">Resultados-Chave</h3>
                <hr className="text-black w-[40%]" />
              </div>

              <div className="mb-4">
                <h2 className="font-bold mb-2">
                  Aumentar a conversão da página de checkout 3% para 5%
                </h2>
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "30%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    35%
                  </span>
                </div>
                <ul className="mt-2 flex flex-col gap-2">
                  <li className="text-sm text-gray-400 flex justify-between">
                    Reduzir o número de etapas no checkout <span>50%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    adicionar mais opção de pagamento <span>10%</span>
                  </li>
                </ul>
              </div>

              <hr className="py-2" />

              <div className="mb-4">
                <h2 className="font-bold mb-2">
                  Reduzir a taxa de abandono de carrinho de 40% para 25%
                </h2>
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "88%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    35%
                  </span>
                </div>
                <ul className="mt-2 flex flex-col gap-2">
                  <li className="text-sm text-gray-400 flex justify-between">
                    Implementar e-mails automáticos de recuperação de carrinho{" "}
                    <span>75%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Melhorar o carregamento da página de pagamento{" "}
                    <span>10%</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-[#0094B5] hover:underline mt-1">
                + Adicionar Resultado-Chave
              </button>
            </div>
          </div>

          <div className="w-full md:w-[49%]">
            <div className="bg-white p-5 rounded-md shadow-sm ">
              <h2 className="font-bold mb-2">
                Melhorar a satisfação do Cliente
              </h2>
              <div className="mb-4">
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "37%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    37%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <hr className="text-black w-[40%]" />
                <h3 className="text-gray-400 text-sm">Resultados-Chave</h3>
                <hr className="text-black w-[40%]" />
              </div>

              <div className="mb-4">
                <h2 className="font-bold mb-2">Aumentar o NPS de 60 para 80</h2>
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "35%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    35%
                  </span>
                </div>
                <ul className="mt-2 flex flex-col gap-2">
                  <li className="text-sm text-gray-400 flex justify-between">
                    Implementar pesquisas de satisfação pós-atendimento{" "}
                    <span>25%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Criar um programa de fidelidade para clientes recorrentes{" "}
                    <span>10%</span>
                  </li>
                </ul>
              </div>

              <hr className="py-2" />

              <div className="mb-4">
                <h2 className="font-bold mb-2">Aumentar o NPS de 60 para 80</h2>
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "38%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    35%
                  </span>
                </div>
                <ul className="mt-2 flex flex-col gap-2">
                  <li className="text-sm text-gray-400 flex justify-between">
                    Implementar um chatbot para suporte básico <span>99%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Criar uma central de ajuda com FAQs detalhadas{" "}
                    <span>10%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Ampliar a equipe de atendimento em horário de pico{" "}
                    <span>5%</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-[#0094B5] hover:underline mt-1">
                + Adicionar Resultado-Chave
              </button>
            </div>
          </div>

          <div className="w-full md:w-[49%]">
            <div className="bg-white p-5 rounded-md shadow-sm ">
              <h2 className="font-bold mb-2">
                Melhorar a satisfação do Cliente
              </h2>
              <div className="mb-4">
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "37%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    37%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <hr className="text-black w-[40%]" />
                <h3 className="text-gray-400 text-sm">Resultados-Chave</h3>
                <hr className="text-black w-[40%]" />
              </div>

              <div className="mb-4">
                <h2 className="font-bold mb-2">Aumentar o NPS de 60 para 80</h2>
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "35%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    35%
                  </span>
                </div>
                <ul className="mt-2 flex flex-col gap-2">
                  <li className="text-sm text-gray-400 flex justify-between">
                    Implementar pesquisas de satisfação pós-atendimento{" "}
                    <span>25%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Criar um programa de fidelidade para clientes recorrentes{" "}
                    <span>10%</span>
                  </li>
                </ul>
              </div>

              <hr className="py-2" />

              <div className="mb-4">
                <h2 className="font-bold mb-2">Aumentar o NPS de 60 para 80</h2>
                <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
                  <div
                    className="bg-[#0094B5] rounded-full h-4"
                    style={{ width: "38%" }}
                  ></div>
                  <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
                    35%
                  </span>
                </div>
                <ul className="mt-2 flex flex-col gap-2">
                  <li className="text-sm text-gray-400 flex justify-between">
                    Implementar um chatbot para suporte básico <span>99%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Criar uma central de ajuda com FAQs detalhadas{" "}
                    <span>10%</span>
                  </li>
                  <li className="text-sm text-gray-400 flex justify-between">
                    Ampliar a equipe de atendimento em horário de pico{" "}
                    <span>5%</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-[#0094B5] hover:underline mt-1">
                + Adicionar Resultado-Chave
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

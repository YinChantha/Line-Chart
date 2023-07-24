import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getAllfixeddepositlist } from "../public/service/calldata";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Chart from "../public/Chart";

const term = [
  { id: 1, name: "6" },
  { id: 2, name: "7" },
  { id: 3, name: "8" },
  { id: 4, name: "9" },
  { id: 5, name: "10" },
  { id: 6, name: "11" },
  { id: 7, name: "12" },
  { id: 8, name: "18" },
  { id: 9, name: "24" },
  { id: 10, name: "48" },
  { id: 11, name: "60" },
];

const Bank = [
  { id: 1, name: "ABA" },
  { id: 2, name: "ACLEDA" },
  { id: 3, name: "J-TRUST" },
  { id: 4, name: "PHILLIP" },
  { id: 5, name: "LYHOUR" },
  { id: 6, name: "PRINCE" },
  { id: 7, name: "SATHAPANA" },
  { id: 8, name: "MAYBANK" },
  { id: 9, name: "PRASAC" },
  { id: 10, name: "VATTANAC" },
];
function App() {
  const [data11, setData] = useState("");
  const [selectedBank, setSelectedBank] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedTerm, setSelectedTerm] = useState([]);
  const [queryterm, setQueryterm] = useState("");
  const [rate, setRate] = useState("Maturity");
  const [currency, setCurrency] = useState("KHR");

  const filteredBank =
    query === ""
      ? Bank
      : Bank.filter((d) =>
          d.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const filteredTerm =
    queryterm === ""
      ? term
      : term.filter((d) =>
          d.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryterm.toLowerCase().replace(/\s+/g, ""))
        );

  const handleBankChange = (selectedOptions) => {
    setSelectedBank(selectedOptions);
  };
  const handleTermChange = (selectedOptions) => {
    setSelectedTerm(selectedOptions);
  };

  const handleCurrencyChange = (event) => {
    const response = event.target.value;
    setCurrency(response);
  };

  const handleRateatChange = (event) => {
    const response = event.target.value;
    setRate(response);
  };

  const GetFixedDeposits = async () => {
    const bankName = selectedBank.map((bank) => bank.name.toLowerCase());
    const term = selectedTerm.map((term) => term.name);
    try {
      const res = await getAllfixeddepositlist({
        currency: currency,
        rateAt: rate,
        bank: bankName,
        term,
      });

      setData(res.data.bankTermRate);
      console.log("data is here : ", res.data.bankTermRate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <div className="bg-gray-200 inset-0"></div>
      <div>
        <button
          onClick={GetFixedDeposits}
          className="get-started-btn  text-white bg-red-500 rounded-lg md:w-40 w-full h-10 hover:bg-red-600"
        >
          Test Api Call
        </button>
        <div className="flex flex-col gap-3 w-full relative z-10">
          <label htmlFor="value" className="labelStyle">
            Select your bank
          </label>
          <Combobox value={selectedBank} onChange={handleBankChange} multiple>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(Bank) => Bank.map((d) => d.name).join(", ")}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredBank.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredBank.map((Bank) => (
                      <Combobox.Option
                        key={Bank.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={Bank}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {Bank.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        <div className="flex flex-col gap-3 w-full relative ">
          <label htmlFor="value" className="labelStyle">
            Select your Rate
          </label>
          <Combobox value={selectedTerm} onChange={handleTermChange} multiple>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input 
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 z-50"
                  displayValue={(term) => term.map((d) => d.name).join(", ")}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400 "
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQueryterm("")}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white z-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredTerm.length === 0 && queryterm !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredTerm.map((term) => (
                      <Combobox.Option
                        key={term.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={term}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {term.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row justify-center ">
            <label htmlFor="value" className="labelStyle truncate ">
              Select currency
            </label>
          </div>
          <select className="py-2 shadow-md rounded-xl" onChange={handleCurrencyChange}>
            <option value="KHR">KHR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row justify-center">
            <label htmlFor="value" className="labelStyle truncate ">
              Select rateAt
            </label>
          </div>
          <select className="shadow-md py-2 rounded-md" onChange={handleRateatChange}>
            <option value="Maturity">Maturity</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </div>
      </div>
      <Chart data={data11} />
    </div>
  );
}

export default App;

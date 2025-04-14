import { useEffect } from "react";
import { supabase } from "../supabase";

// Pagina de pruebas
function Test() {

    useEffect(() => {
        getMatrizModelo();
    }, [])

    return (
        <>
            <br />

            {/* Seccion modificada con responsive */}
            <div className="self-stretch pb-6 md:pb-24 bg-white flex flex-col justify-center items-center overflow-hidden">
                <div className="w-full max-w-[1280px] px-4 md:px-8 flex flex-col justify-start items-start gap-4 md:gap-8">
                    <div className="self-stretch p-6 md:p-16 bg-purple-50 rounded-2xl flex flex-col lg:flex-row justify-between items-start gap-6">
                        <div className="flex-1 flex flex-col justify-start items-start gap-2 md:gap-4 min-w-0">
                            <h2 className="w-full text-indigo-900 text-xl md:text-3xl font-custom font-semibold leading-7 md:leading-9">
                                Start your 30-day free trial
                            </h2>
                            <p className="w-full text-violet-700 text-base md:text-xl font-normal leading-normal md:leading-loose">
                                Join over 4,000+ startups already growing with Untitled.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-start items-start gap-3 w-full lg:w-auto">
                            <button className="px-4 md:px-5 py-2 md:py-3 bg-white rounded-lg shadow-sm border border-zinc-300 flex justify-center items-center gap-2 w-full sm:w-auto">
                                <span className="text-gray-700 text-sm md:text-base font-semibold">Learn more</span>
                            </button>
                            <button className="px-4 md:px-5 py-2 md:py-3 bg-violet-500 rounded-lg shadow-sm flex justify-center items-center gap-2 w-full sm:w-auto">
                                <span className="text-white text-sm md:text-base font-semibold">Get started</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <br />

            {/* <div className="w-[1280px] px-8 inline-flex flex-col justify-start items-start">
                <div className="self-stretch inline-flex justify-center items-start gap-8">
                    <div className="flex-1 bg-white rounded-2xl shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08)] outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch px-8 pt-8 flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-center gap-2">
                                <div className="self-stretch flex flex-col justify-start items-center gap-5">
                                    <div data-color="Primary" data-size="md" data-theme="Light circle outline" className="w-10 h-10 relative bg-purple-100 rounded-3xl outline-[6px] outline-offset-[-3px] outline-purple-50">
                                        <div className="w-5 h-5 left-[10px] top-[10px] absolute overflow-hidden">
                                            <div className="w-3.5 h-4 left-[2.50px] top-[1.67px] absolute outline-[1.67px] outline-offset-[-0.83px] outline-violet-500" />
                                        </div>
                                    </div>
                                    <div className="self-stretch text-center justify-start text-violet-700 text-xl font-semibold leading-loose">Basic plan</div>
                                </div>
                                <div className="self-stretch text-center justify-start text-gray-900 text-5xl font-semibold leading-[60px]">$10/mth</div>
                                <div className="self-stretch text-center justify-start text-gray-600 text-base font-normal leading-normal">Billed annually.</div>
                            </div>
                        </div>
                        <div className="self-stretch p-8 flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-start gap-4">
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Access to all basic features</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Basic reporting and analytics</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Up to 10 individual users</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">20GB individual data each user</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Basic chat and email support</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-8 bg-neutral-50 flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                <div data-destructive="False" data-hierarchy="Primary" data-icon="False" data-size="xl" data-state="Default" className="self-stretch rounded-lg inline-flex justify-start items-start">
                                    <div data-icon="False" data-size="xl" className="flex-1 px-5 py-3 bg-violet-500 rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-1 outline-offset-[-1px] outline-violet-500 flex justify-center items-center gap-2 overflow-hidden">
                                        <div className="justify-start text-white text-base font-semibold leading-normal">Get started</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08)] outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch px-8 pt-8 flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-center gap-2">
                                <div className="self-stretch flex flex-col justify-start items-center gap-5">
                                    <div data-color="Primary" data-size="md" data-theme="Light circle outline" className="w-10 h-10 relative bg-purple-100 rounded-3xl outline-[6px] outline-offset-[-3px] outline-purple-50">
                                        <div className="w-5 h-5 left-[10px] top-[10px] absolute overflow-hidden">
                                            <div className="w-4 h-3 left-[1.67px] top-[3.75px] absolute outline-[1.67px] outline-offset-[-0.83px] outline-violet-500" />
                                        </div>
                                    </div>
                                    <div className="self-stretch text-center justify-start text-violet-700 text-xl font-semibold leading-loose">Business plan</div>
                                </div>
                                <div className="self-stretch text-center justify-start text-gray-900 text-5xl font-semibold leading-[60px]">$20/mth</div>
                                <div className="self-stretch text-center justify-start text-gray-600 text-base font-normal leading-normal">Billed annually.</div>
                            </div>
                        </div>
                        <div className="self-stretch p-8 flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-start gap-4">
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">200+ integrations</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Advanced reporting and analytics</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Up to 20 individual users</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">40GB individual data each user</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Priority chat and email support</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-8 bg-neutral-50 flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                <div data-destructive="False" data-hierarchy="Primary" data-icon="False" data-size="xl" data-state="Default" className="self-stretch rounded-lg inline-flex justify-start items-start">
                                    <div data-icon="False" data-size="xl" className="flex-1 px-5 py-3 bg-violet-500 rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-1 outline-offset-[-1px] outline-violet-500 flex justify-center items-center gap-2 overflow-hidden">
                                        <div className="justify-start text-white text-base font-semibold leading-normal">Get started</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08)] outline-1 outline-offset-[-1px] outline-gray-200 inline-flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch px-8 pt-8 flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-center gap-2">
                                <div className="self-stretch flex flex-col justify-start items-center gap-5">
                                    <div data-color="Primary" data-size="md" data-theme="Light circle outline" className="w-10 h-10 relative bg-purple-100 rounded-3xl outline-[6px] outline-offset-[-3px] outline-purple-50">
                                        <div className="w-5 h-5 left-[10px] top-[10px] absolute overflow-hidden">
                                            <div className="w-4 h-4 left-[1.67px] top-[1.67px] absolute outline-[1.67px] outline-offset-[-0.83px] outline-violet-500" />
                                        </div>
                                    </div>
                                    <div className="self-stretch text-center justify-start text-violet-700 text-xl font-semibold leading-loose">Enterprise plan</div>
                                </div>
                                <div className="self-stretch text-center justify-start text-gray-900 text-5xl font-semibold leading-[60px]">$40/mth</div>
                                <div className="self-stretch text-center justify-start text-gray-600 text-base font-normal leading-normal">Billed annually.</div>
                            </div>
                        </div>
                        <div className="self-stretch p-8 flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-start gap-4">
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Advanced custom fields</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Audit log and data history</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Unlimited individual users</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Unlimited individual data</div>
                                    </div>
                                </div>
                                <div data-breakpoint="Desktop" data-color="Primary" data-size="sm" className="self-stretch inline-flex justify-start items-start gap-3">
                                    <div data-color="Primary" data-size="sm" className="w-6 h-6 relative bg-purple-100 rounded-xl overflow-hidden">
                                        <div className="w-3 h-2.5 left-[6.35px] top-[7.12px] absolute bg-violet-400" />
                                    </div>
                                    <div className="flex-1 inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch justify-start text-gray-600 text-base font-normal leading-normal">Personalised+priotity service</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch p-8 bg-neutral-50 flex flex-col justify-start items-start gap-6">
                            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                                <div data-destructive="False" data-hierarchy="Primary" data-icon="False" data-size="xl" data-state="Default" className="self-stretch rounded-lg inline-flex justify-start items-start">
                                    <div data-icon="False" data-size="xl" className="flex-1 px-5 py-3 bg-violet-500 rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-1 outline-offset-[-1px] outline-violet-500 flex justify-center items-center gap-2 overflow-hidden">
                                        <div className="justify-start text-white text-base font-semibold leading-normal">Get started</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <br />
            <br />
            <br />
        </>
    )

    // Obtener matriz modelo
    async function getMatrizModelo() {
        try {
            const { data, error } = await supabase.from("matriz_modelo").select();
            if (error) throw error;
            console.log(data);
        } catch (error) {
            console.error("Error fetching matriz modelo:", error);
        }
    }
}

export { Test }
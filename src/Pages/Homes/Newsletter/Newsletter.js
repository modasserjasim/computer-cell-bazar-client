import React from 'react';

const Newsletter = () => {
    return (
        <section className="bg-base-200">
            <div
                className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center"
            >
                <div className="mx-auto max-w-5xl text-center">
                    <h1
                        className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Subscribe to our Newsletter and

                        <span className="sm:block mt-2"> get the new job posts in your inbox. </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl sm:text-xl sm:leading-relaxed">
                        Want us to email you with the latest computer job posts? So subscribe below and we will send you the latest computer job posts!
                    </p>

                    <div className="mx-auto max-w-lg">
                        <form className="mt-6">
                            <div className="relative max-w-lg">
                                <label className="sr-only" for="email"> Email </label>

                                <input
                                    className="w-full rounded-full border-base-300 bg-base-100 p-6 pr-32 text-sm font-medium"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your best email"
                                />

                                <button
                                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-primary px-5 py-3 text-lg font-medium text-white transition hover:bg-secondary"
                                    type="button"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Newsletter;
"use client";

const ErrorPage = ({ statusCode }: { statusCode: number }) => {
    return (
        <div>
            <p>
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }: { res: any, err: any }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    console.error(err);
    return { statusCode };
};

export default ErrorPage;

import { getUser } from '~/server/auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html>
      <body>
        {user && (
          <div>
            <p>User: {JSON.stringify(user)}</p>
          </div>
        )}
        {children}
      </body>
    </html>
  );
}

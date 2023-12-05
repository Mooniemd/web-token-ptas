export default async function ListUsers({users}){
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return(
        <div>

            {users?.map((user,index) =>
            <div className="listText">
                <h2 key={index}>
                    {user.usuario} <span>{user.senha}</span>
                </h2>
                </div>
            )}

        </div>
    );
}
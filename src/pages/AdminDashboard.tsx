import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";

type User = {
  id: string;
  username: string;
  email: string;
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList: User[] = [];
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() } as User);
        });
        setUsers(usersList);
      } catch (error) {
        setError("Error fetching users.");
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError("Error deleting user.");
    }
  };

  const handleUpdateUser = async (id: string) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { username: newUsername });
      setUsers(users.map((user) =>
        user.id === id ? { ...user, username: newUsername } : user
      ));
      setNewUsername("");
    } catch (error) {
      setError("Error updating user.");
    }
  };

  const handleCreateUser = async () => {
    if (newUsername) {
      const newUser = {
        username: newUsername,
        email: `${newUsername}@gmail.com`, // Example email structure
      };
      try {
        const userRef = doc(collection(db, "users"));
        await setDoc(userRef, newUser);
        setUsers([...users, { id: userRef.id, ...newUser }]);
        setNewUsername("");
      } catch (error) {
        setError("Error creating user.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mb-4 text-center">
        <input
          type="text"
          className="border border-gray-400 p-2 rounded-lg"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="New username"
        />
        <button
          onClick={handleCreateUser}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add User
        </button>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg">
            <div>
              <p className="font-bold">{user.username}</p>
              <p>{user.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleUpdateUser(user.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
              >
                Update Username
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

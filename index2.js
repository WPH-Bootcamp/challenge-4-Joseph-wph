const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8);
  return timestamp + random;
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru

  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  const input = prompt("Enter your to-do: ").trim();
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  if (!input) {
    console.log("To-do cannot be empty.");
    return;
  }
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  const newTodo = {
    id: generateUniqueId(),
    text: input,
    isCompleted: false,
  };
  // 4. Tambahkan objek to-do ini ke array `todos`
  todos.push(newTodo);
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  console.log(`To-do "${input}" added.`);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai

  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  listTodos();
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  if (todos.length === 0) return;

  const answer = prompt("Enter the NUMBER of the to-do to mark as completed: ");
  const index = parseInt(answer) - 1;
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number.");
    return;
  }

  const todo = todos[index];
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  if (todo.isCompleted) {
    console.log(`To-do "${todo.text}" is already completed.`);
    return;
  }
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  todo.isCompleted = true;
  console.log(`To-do "${todo.text}" marked as completed.`);
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do

  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  listTodos();
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  if (todos.length === 0) return;

  const answer = prompt("Enter the NUMBER of the to-do to delete: ");
  const index = parseInt(answer) - 1;
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  if (isNaN(index) || index < 0 || index >= todos.length) {
    console.log("Invalid number.");
    return;
  }
  // 4. Hapus to-do yang dipilih dari array `todos`
  const removed = todos.splice(index, 1)[0];
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  console.log(`To-do "${removed.text}" deleted.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do

  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  console.log("\n--- YOUR TO-DO LIST ---");
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  if (todos.length === 0) {
    console.log("No to-dos to display.\n");
    return;
  }
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  todos.forEach((todo, i) => {
    // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
    //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${i + 1}. ${status} | ${todo.text}`);
  });
  // 5. Tampilkan garis penutup daftar
  console.log();
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    console.log(`
Choose a command:
1. add
2. complete
3. delete
4. list
5. exit
`);
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    const command = prompt("Enter command: ").toLowerCase();
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    switch (command) {
      case "1":
      case "add":
        addTodo();
        break;

      case "2":
      case "complete":
        markTodoCompleted();
        break;

      case "3":
      case "delete":
        deleteTodo();
        break;

      case "4":
      case "list":
        listTodos();
        break;
      // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
      case "5":
      case "exit":
        running = false;
        console.log("Exiting To-do App...");
        break;
      // 5. Tangani input perintah yang tidak valid
      default:
        console.log("Invalid command. Try again.");
    }
  }
}

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};

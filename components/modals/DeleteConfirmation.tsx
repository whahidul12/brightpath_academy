export const DeleteConfirmation = ({
  id,
  table,
}: {
  id?: number | string;
  table: string;
}) => {
  return id ? (
    <form>
      <span>Are you sure</span>
      <button type="submit" className="bg-red-400 p-2">
        delete
      </button>
    </form>
  ) : (
    "invalide form888"
  );
};

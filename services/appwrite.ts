import { Account, Client, ID, Query, TablesDB } from "react-native-appwrite";

// const client = new Client();
// client
//   .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
//   .setProject("<PROJECT_ID>") // Replace with your project ID
//   .setPlatform("com.example.idea-tracker");

// export const account = new Account(client);
// export const tablesDB = new TablesDB(client);

// track the searches made by the users

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const MOVIES_TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_TABLE_ID!;

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const tablesDB = new TablesDB(client);

// the actual code for the app

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal("searchTerm", query)],
    });

    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];

      await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: existingMovie.$id,
        data: {
          count: existingMovie.count + 1,
        }, // optional
      });
    } else {
      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (err: any) {
    // Alert.alert("Error : " + err.message);
    throw new Error("There has been an Error" + err.message);
  }
};
// from the updateSearchCount
//check if the record of that search has already stored
//if a document is found increment the searchCount field
//if no document is found c
//create a new document in Apprite database ->

export const getTrendingMovies = async () => {
  // try {
  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    queries: [Query.limit(5), Query.orderDesc("count")],
  });
  return result.rows;
  // } catch (err) {
  //   console.log(err);
  //   return undefined;
  // }

  //   try {
  //   } catch (err) {
  //     console.log(err);
  //   }
};

// CHECK IF THE MOVIE IS SAVED  (custom code)
export const isMovieSaved = async (movie: MovieDetails) => {
  const response = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: MOVIES_TABLE_ID,
    queries: [Query.equal("title", movie.title)],
  });
  const savedMovie = response.rows;
  return savedMovie.length > 0;
};

// GET SAVED MOVIES
export const getMoviesSaved = async () => {
  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: MOVIES_TABLE_ID,
  });
  return result.rows;
};

// GET THE MOVIE SAVED ROW ID
export const getMovieSavedRowId = async (movie: MovieDetails) => {
  const response = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: MOVIES_TABLE_ID,
    queries: [Query.equal("title", movie.title)],
  });
  if (response.rows.length > 0) {
    return response.rows[0].$id;
  }
  return null;
};

// SAVE THE MOVIE
export const saveMovie = async (movie: MovieDetails) => {
  await tablesDB.createRow({
    databaseId: DATABASE_ID,
    tableId: MOVIES_TABLE_ID,
    rowId: ID.unique(),
    data: {
      movie_id: movie.id,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
    },
  });
};

// REMOVE SAVED MOVIE
export const removeSavedMovie = async (row_id: string) => {
  try {
    await tablesDB.deleteRow({
      databaseId: DATABASE_ID,
      tableId: MOVIES_TABLE_ID,
      rowId: row_id,
    });
  } catch (err: any) {
    throw new Error("Failed to remove the movie" + err.message);
  }
};

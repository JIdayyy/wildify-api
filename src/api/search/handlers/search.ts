import { SearchHandler } from "../interfaces";
import prisma from "../../../../prisma/client";

const searchHandler: SearchHandler["search"] = async (req, res, next) => {
  const { search } = req.query;

  try {
    const albums = await prisma.album.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search as string,
              mode: "insensitive",
            },
          },
          {
            artist: {
              name: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });

    const artists = await prisma.artist.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search as string,
              mode: "insensitive",
            },
          },
          {
            albums: {
              some: {
                title: {
                  contains: search as string,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
    });

    const songs = await prisma.song.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search as string,
              mode: "insensitive",
            },
          },
          {
            album: {
              title: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });

    const playlists = await prisma.playlist.findMany({
      where: {
        title: {
          contains: search as string,
          mode: "insensitive",
        },
      },
    });

    const results = {
      albums: albums.map((album) => ({
        ...album,
        type: "__album__",
      })),
      artists: artists.map((artist) => ({
        ...artist,
        type: "__artist__",
      })),
      songs: songs.map((song) => ({
        ...song,
        type: "__song__",
      })),
      playlists: playlists.map((playlist) => ({
        ...playlist,
        type: "__playlist__",
      })),
    };

    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export default searchHandler;

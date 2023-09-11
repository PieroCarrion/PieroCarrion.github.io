/* eslint-disable prettier/prettier */
import { FC, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import axios from 'axios'
import { logger } from 'src/logs'
import { Nav } from 'src/components/layouts'
import { Profile, TProfile } from 'src/components/features'

export const HomePage: FC<TProfile> = ({ user, content }) => {
  useEffect(() => {
    logger.track('opened-home-page')
  }, [])

  return (
    <>
      <Head>
        <title>Piero Carrion</title>
        <meta name="keywords" content="Piero, Carrion, PieroCarrion, Software, Developer, Backend"/>
        <meta property="og:title" content="Piero Carrion: Software Developer" />
        <meta property="og:image" content="/og.png" />
      </Head>

      <Nav />
      <Profile user={user} content={content} />
    </>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
  const userUrl = 'https://api.github.com/users/pierocarrion'
  const contentUrl =
    'https://raw.githubusercontent.com/pierocarrion/pierocarrion/main/README.md'

  const user = await axios
    .get(userUrl)
    .then(({ data }) => ({ user: data as unknown }))
    .catch((error) => ({ error: error as unknown }))

  const content = await axios
    .get(contentUrl)
    .then(({ data }) => ({ content: data as unknown }))
    .catch((error) => ({ error: error as unknown }))

  return {
    props: {
      ...user,
      ...content,
    },
    revalidate: 10080, // one week
  }
}

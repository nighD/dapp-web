'use client'
import React, { useEffect, useState } from "react"
import { Button } from "./ui/button"
import {
  AUTH_PROVIDER,
  AuthProvider,
  CHAIN,
  THEME,
  User,
  WALLET_PROVIDER,
  SUPPORTED_ETHEREUM_NETWORKS,
  getUser,
  getWalletModel,
  init,
  openWallet,
  sendToken,
  signIn,
  signInWithProvider,
  signOut,
} from '@ramper/ethereum'
const RamperScreen = () => {

  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    // @ts-ignore
    Unity.call('TEST UNITY')
    // @ts-ignore
    Unity.call(JSON.stringify({ type: "CALL FOR BAO" }));
  }, [])

  useEffect(() => {
    init({
      appName: 'Tomochain Test App',
      authProviders: [
        AUTH_PROVIDER.GOOGLE,
        AUTH_PROVIDER.FACEBOOK,
        AUTH_PROVIDER.TWITTER,
        AUTH_PROVIDER.APPLE,
        AUTH_PROVIDER.EMAIL,
      ],
      walletProviders: [WALLET_PROVIDER.METAMASK],
      network: SUPPORTED_ETHEREUM_NETWORKS.MAINNET,
      theme: THEME.DARK,
    })
    if (typeof window !== 'undefined') {
      setUser(getUser() as User)
    }
  }, [])

  const handleSignIn = async () => {
    const signInResult = await signIn()
    setUser(getUser() as User)
  }


  const handleSignWithProvider = async (provider: AuthProvider) => {
    const signInResult = await signInWithProvider({ provider })
    setUser(signInResult.user)
    console.log(signInResult)
    // @ts-ignore
    Unity.call(JSON.stringify(signInResult))
  }

  return (
    <div className="flex w-full h-full justify-center items-center flex-col gap-6">
      <h2>LOGIN WITH PROVIDER</h2>
      <div className="flex flex-col gap-4">
        <Button onClick={() => handleSignWithProvider(AUTH_PROVIDER.GOOGLE)} style={{ width: '100%' }}>
          Login with google
        </Button>
        <Button onClick={() => handleSignWithProvider(AUTH_PROVIDER.FACEBOOK)} style={{ width: '100%' }}>
          Login with facebook
        </Button>
        <Button onClick={() => handleSignWithProvider(AUTH_PROVIDER.TWITTER)} style={{ width: '100%' }}>
          Login with twitter
        </Button>
        <Button onClick={() => handleSignWithProvider(AUTH_PROVIDER.APPLE)} style={{ width: '100%' }}>
          Login with apple
        </Button>
        <Button onClick={() => handleSignWithProvider(AUTH_PROVIDER.EMAIL)} style={{ width: '100%' }}>
          Login with email
        </Button>
      </div>
    </div>
  )
}

export default RamperScreen;
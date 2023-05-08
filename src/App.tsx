import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import {useLayoutEffect} from "react";
import {app} from "./firebase.ts";
import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";

const auth = getAuth(app);
const phoneNumberAtom = atom('')
const codeAtom = atom('')
const verifierAtom = atom<RecaptchaVerifier | null>(null)
const confirmResultAtom = atom<ConfirmationResult | null>(null)

const Step1 = () => {
    const [phoneNumber, setPhoneNumber] = useAtom(phoneNumberAtom)
    const [verifier, setVerifier] = useAtom(verifierAtom)
    const setConfirmResult = useSetAtom(confirmResultAtom)

    useLayoutEffect(() => {
        const appVerifier = new RecaptchaVerifier('sign-in-button', {
            size: 'invisible',
            callback: () => {
                // // reCAPTCHA solved, allow signInWithPhoneNumber.
                // alert(JSON.stringify(response, null, 2))
            }
        }, auth);
        setVerifier(appVerifier)
    }, [setVerifier])

    const onClick = async () => {
        if (verifier) {
            try {
                const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier)
                setConfirmResult(confirmationResult)
            } catch(e) {
                console.error(e);
            }
        }
    }

    return (
        <section>
            <label>
                전화번호
                <input type="text" onChange={(e) => setPhoneNumber(`+82${e.target.value}`)}/>
            </label>
            <button id="sign-in-button" onClick={onClick}>전화번호 인증 요청</button>
        </section>
    )
}

const Step2 = () => {
    const [code,setCode] = useAtom(codeAtom)
    const confirmResult = useAtomValue(confirmResultAtom)
    const onClick = async () => {
        if (confirmResult) {
            try {
                await confirmResult.confirm(code)
                alert('인증 완료! 새로고침!')
                location.reload();
            } catch(e) {
                console.error(e)
            }
        }
    }

    return (
        <section>
            <label>
                인증번호
                <input type="text" onChange={(e) => setCode(e.target.value)}/>
            </label>
            <button onClick={onClick}>인증 확인</button>
        </section>
    )
}

function App() {
  const confirmResult = useAtomValue(confirmResultAtom)
  if (confirmResult) {
      return <Step2 />
  }

  return <Step1 />
}


export default App

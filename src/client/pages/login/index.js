import React, { useEffect } from 'react';
import * as S from '../../pageStyles/loginStyle';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useValidation } from '../../hooks';
import { LOG_IN_REQUEST, SIGN_UP_CHECKED } from '../../actions/userActions';
import Link from 'next/link';
import SEO from '../../components/SEO';
import LoginSignupLayout from '../../components/LoginSignupLayout';


const Login = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const { myInformation, signupChecked } = useSelector(state => state.user);
  const [id, onChangeId, checkId, idErrorReason, setIdErrorReason] = useValidation('', '아이디', 'login');
  const [password, onChangePassword, checkPassword, passwordErrorReason, setPasswordErrorReason] = useValidation('', '비밀번호', 'login');
  const pageInformation = {
    title: '로그인 - 설캣',
    description: '설캣에 회원가입 또는 로그인을 하여 최고의 플레이를 자랑 또는 최악의 플레이를 박제해 보세요!',
    ogTitle: '로그인 - 설캣',
    ogDescription: '최고 또는 최악의 플레이를 설캣에서 박제해 보세요!',
    ogUrl: 'http://www.seolcat.com',
    ogImage: null,
  };


  useEffect(() => {

    if(myInformation) {
      if(router.query['prev-page'] !== undefined) {
        router.replace(`${router.query['prev-page']}`);
      }else {
        router.replace('/');
      }
    }

  }, [myInformation?.id]);

  useEffect(() => {

    if(signupChecked) {
      dispatch({
        type: SIGN_UP_CHECKED,
      })
    }

  }, []);

  const formValueAllCheck = () => {

    let allCheck = true;
    if(idErrorReason || passwordErrorReason) {
      allCheck = false;
    }
    const formValues = [
      {
        type: '아이디',
        typeValue: id,
        setErrorReason: setIdErrorReason,
      },
      {
        type: '비밀번호',
        typeValue: password,
        setErrorReason: setPasswordErrorReason,
      },
    ];
    for(let element of formValues) {
      if(!element['typeValue']) {
        element.setErrorReason(`${element['type']}를 입력해 주세요!`);
        allCheck = false;
      }
    }
    return allCheck;

  };

  const submitLogin = (e) => {

    e.preventDefault();
    if(!formValueAllCheck()) {
      return
    }
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        userId: id,
        password,
      },
    });
    
  };


  return (
    <>
      <SEO {...pageInformation} />
      <LoginSignupLayout>
        <S.LoginMainContainer>
          <S.Form type='hidden' onSubmit={submitLogin}>
            <S.Header>
              <div className='mainLogoWrapper' onClick={() => {router.replace('/')}}>
                <img src='login_main_logo.svg' alt='login_main_logo.svg' />
              </div>
              <p>로그인</p>
            </S.Header>
            <S.Contents>
              <input type='text' placeholder='아이디' value={id} onChange={onChangeId} onBlur={checkId} />
              {idErrorReason && 
                <S.ErrorReason>
                  <p>{idErrorReason}</p>
                </S.ErrorReason>
              }
              <input type='password' placeholder='비밀번호' value={password} onChange={onChangePassword} onBlur={checkPassword} />
              {passwordErrorReason && 
                <S.ErrorReason>
                  <p>{passwordErrorReason}</p>
                </S.ErrorReason>
              }
              <button type='submit' aria-label='logInSubmitButton'>
                <p>로그인</p>
              </button>
              <div className='line' />
              <S.Guide>
                <p>처음 오셨나요?{`\u00A0`}</p>
                <Link href={{pathname: '/signup', query: {'prev-page': `${router.query['prev-page']}`}}}>
                  <a>
                    <p>회원가입</p>
                  </a>
                </Link>
                <p>을{`\u00A0`}</p>
                <p>해주세요.</p>
              </S.Guide>
            </S.Contents>
          </S.Form>
        </S.LoginMainContainer>
      </LoginSignupLayout>
    </>
  );

};


export default Login;
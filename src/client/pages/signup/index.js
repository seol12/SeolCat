import React, { useState, useEffect } from 'react';
import * as S from '../../pageStyles/signupStyle';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useValidation } from '../../hooks';
import { SIGN_UP_REQUEST } from '../../actions/userActions';
import Link from 'next/link';
import SEO from '../../components/SEO';
import LoginSignupLayout from '../../components/LoginSignupLayout';


const Signup = () => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const { signupChecked } = useSelector(state => state.user);
  const [id, onChangeId, checkId, idErrorReason, setIdErrorReason] = useValidation('', '아이디', 'signup');
  const [nickname, onChangeNickname, checkNickname, nicknameErrorReason, setNicknameErrorReason] = useValidation('', '닉네임', 'signup');
  const [password, onChangePassword, checkPassword, passwordErrorReason, setPasswordErrorReason] = useValidation('', '비밀번호', 'signup');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckErrorReason, setPasswordCheckErrorReason] = useState('');
  const pageInformation = {
    title: '회원가입 - 설캣',
    description: '설캣에 회원가입 또는 로그인을 하여 오늘의 하루를 공유해 보세요!',
    ogTitle: '회원가입 - 설캣',
    ogDescription: '설캣에 회원가입 또는 로그인을 하여 오늘의 하루를 공유해 보세요!',
    ogUrl: 'http://www.seolcat.com',
    ogImage: null,
  };


  useEffect(() => {

    if(signupChecked) {
      if(router.query[`prev-page`] !== undefined) {
        router.replace({
          pathname: '/login', 
          query: {
            'prev-page': `${router.query['prev-page']}`,
          },
        });
      }else {
        router.replace('/login');
      }
    }
    
  }, [signupChecked]);

  const formValueAllCheck = () => {

    let allCheck = true;
    if(idErrorReason || nicknameErrorReason || passwordErrorReason || passwordCheckErrorReason) {
      allCheck = false;
    }
    const formValues = [
      { 
        type: '아이디',
        typeValue: id, 
        setErrorReason: setIdErrorReason,
      }, { 
        type: '닉네임',
        typeValue: nickname, 
        setErrorReason: setNicknameErrorReason,
      }, {
        type: '비밀번호',
        typeValue: password,
        setErrorReason: setPasswordErrorReason,
      }, {
        type: '비밀번호체크',
        typeValue: passwordCheck,
        setErrorReason: setPasswordCheckErrorReason,
      },
    ];
    for(let element of formValues) {
      if(!element['typeValue']) {
        element.setErrorReason('필수 항목입니다.');
        allCheck = false
      }
    }
    return allCheck;

  };
  
  const onSubmitSignup = (e) => {

    e.preventDefault();
    if(!formValueAllCheck()) {
      return;
    }
    if(password !== passwordCheck) {
      return setPasswordCheckErrorReason('비밀번호가 일치하지 않습니다.');
    }
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        userId: id,
        password,
        nickname: nickname,
      }
    });
    
  };

  const onChangeComparePassword = (e) => {

    if(passwordCheck != password) {
      setPasswordCheckErrorReason('비밀번호가 일치하지 않습니다.');
    }
    setPasswordCheck(e.target.value);
    setPasswordCheckErrorReason('');

  };

  const checkComparePassword = () => {

    if(passwordCheck != password) {
      setPasswordCheckErrorReason('비밀번호가 일치하지 않습니다.');
    }else if(!passwordCheck) {
      setPasswordCheckErrorReason('필수 항목입니다.');
    }else {
      setPasswordCheckErrorReason('');
    }
   
  };
  
  
  return (
    <>
      <SEO {...pageInformation} />
      <LoginSignupLayout>
        <S.SignupMainContainer>
          <S.Form type='hidden' onSubmit={onSubmitSignup}>
            <S.Header>
              <div className='signup'>
                <p>회원가입</p>
              </div>
            </S.Header>
            <S.Contents>
              <input type='text' placeholder='아이디' value={id} onChange={onChangeId} onBlur={checkId} />
              {idErrorReason && 
                <S.ErrorReason>
                  <p>{idErrorReason}</p>
                </S.ErrorReason>
                }
              <input type='text' placeholder='닉네임' maxLength={8} value={nickname} onChange={onChangeNickname} onBlur={checkNickname} />
              {nicknameErrorReason && 
                <S.ErrorReason>
                  <p>{nicknameErrorReason}</p>
                </S.ErrorReason>
              }
              <input type='password' placeholder='비밀번호' value={password} onChange={onChangePassword} onBlur={checkPassword} />
              {passwordErrorReason && 
                <S.ErrorReason>
                  <p>{passwordErrorReason}</p>
                </S.ErrorReason>
              }
              <input type='password' placeholder='비밀번호 재확인' value={passwordCheck} onChange={onChangeComparePassword} onBlur={checkComparePassword} />
              {passwordCheckErrorReason && 
                <S.ErrorReason>
                  <p>{passwordCheckErrorReason}</p>
                </S.ErrorReason>
              }
              <button type='submit' aria-label='signUpSubmitButton'>
                <p>가입하기</p>
              </button>
              <div className='line' />
              <S.Guide>
                <p>이미 계정이 있으신가요?{`\u00A0`}</p>
                <Link href={{pathname: '/login', query: {prevpage: `${router.query.prevpage}`}}}>
                  <a>
                    <p>로그인</p>
                  </a>
                </Link>
                <p>을{`\u00A0`}</p>
                <p>해주세요.</p>
              </S.Guide>
            </S.Contents>
          </S.Form>
        </S.SignupMainContainer>
      </LoginSignupLayout>
    </>
  );

};


export default Signup;
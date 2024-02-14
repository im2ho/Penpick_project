package com.penpick.qna.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.penpick.qna.model.Answers;
import com.penpick.qna.model.Questions;
import com.penpick.qna.repository.AnswerRepository;
import com.penpick.qna.repository.QuestionRepository;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class QuestionService {
	
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;


//    //전체 문의글 목록 불러오기
//    public List<Questions> getAllPosts() {
//        return questionRepository.findAll();
//    }
    
//    public Page<Questions> getAllPosts(Pageable pageable) {
//        return questionRepository.findAll(pageable);
//    }
    
    public Page<Questions> getAllPosts(Pageable pageable) {
        return questionRepository.findAllByOrderByQuestionIdDesc(pageable);
    }
    
    //문의글 작성하기
    public Questions saveQuestion(Questions question) {
        return questionRepository.save(question);
    }
    
    //문의글 상세페이지
    public Questions getQuestionById(Long id) {
        Optional<Questions> question = questionRepository.findById(id);
        return question.orElse(null);
    }
    
    //답변 작성하기
    public Answers saveAnswer(Answers answer) {
    	return answerRepository.save(answer);
    }
    
    //답변 내용
    public Answers getAnswerByQuestionId(Long id) {
        Optional<Answers> answer = answerRepository.findByQuestionId(id);
        return answer.orElse(null);
    }
    
    //답변 수정
    public Optional<Answers> updateAnswer(Long id, Answers answer) {
    	
        Optional<Answers> answerOptional = answerRepository.findByQuestionId(id);
        if (answerOptional.isPresent()) {
            Answers existingAnswer = answerOptional.get();
            existingAnswer.setAnswerContent(answer.getAnswerContent());
            // 필요한 경우 추가적인 필드 업데이트
            return Optional.of(answerRepository.save(existingAnswer));
        }
        return Optional.empty();
    }
}

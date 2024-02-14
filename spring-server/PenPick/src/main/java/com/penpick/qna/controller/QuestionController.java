package com.penpick.qna.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.penpick.qna.model.Answers;
import com.penpick.qna.model.Questions;
import com.penpick.qna.service.QuestionService;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/QnA")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class QuestionController {
	
    private final QuestionService questionService;
    
    //전체 질문 목록 가져오기 (페이지네이션)
    @GetMapping("/questionList")
    public Page<Questions> getAllPosts(Pageable pageable) {
        return questionService.getAllPosts(pageable);
    }
    
    //문의글 작성하기
    @PostMapping("/write-question")
    public ResponseEntity<Questions> createQuestion(@RequestBody Questions question) {
        Questions savedQuestion = questionService.saveQuestion(question);
        return ResponseEntity.ok(savedQuestion);
    }
    
    //문의글 상세페이지
    @GetMapping("/questionDetail/{questionId}")
    public ResponseEntity<Questions> getQuestionDetail(@PathVariable Long questionId) {
        
    	Questions question = questionService.getQuestionById(questionId);
    	
        if (question != null) {
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    //답변 작성하기
    @PostMapping("/submitAnswer")
    public ResponseEntity<Answers> SubmitAnswer(@RequestBody Answers answer) {
        Answers savedAnswer = questionService.saveAnswer(answer);
        return ResponseEntity.ok(savedAnswer);
    }
    
    //답변 내용 보이기
    @GetMapping("/answers/{questionId}")
    public ResponseEntity<Answers> getAnswerContent(@PathVariable Long questionId){
    	
    	Answers answer = questionService.getAnswerByQuestionId(questionId);
    	
    	if(answer != null) {
    		return ResponseEntity.ok(answer);
    	} else {
    		return ResponseEntity.notFound().build();
    	}
    }
    
    // 답변 수정
//    @PutMapping("/answers/{id}")
//    public ResponseEntity<Answers> updateAnswer(@PathVariable Long id, @RequestBody Answers answer) {
//        return questionService.updateAnswer(id, answer)
//                .map(updatedAnswer -> ResponseEntity.ok(updatedAnswer))
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
    @PutMapping("/answers/{id}")
    public ResponseEntity<Answers> updateAnswer(@PathVariable Long id, @RequestBody Answers answer) {
        Optional<Answers> updatedAnswerOptional = questionService.updateAnswer(id, answer);
        
        if (updatedAnswerOptional.isPresent()) {
            Answers updatedAnswer = updatedAnswerOptional.get();
            return ResponseEntity.ok(updatedAnswer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}

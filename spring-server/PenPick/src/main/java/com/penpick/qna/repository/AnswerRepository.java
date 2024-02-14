package com.penpick.qna.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.penpick.qna.model.Answers;
import com.penpick.users.model.Users;

public interface AnswerRepository extends JpaRepository<Answers, Long> {

	Optional<Answers> findByQuestionId(Long QuestionId);
}
